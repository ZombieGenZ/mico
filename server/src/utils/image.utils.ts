import { Request } from 'express'
import multer from 'multer'
import fse from 'fs-extra'
import fs from 'fs'
import path from 'path'
import { WEBP_CONFIG } from '~/constants/images.constants'
import sharp from 'sharp'

const storageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/images/uploads/products/temporary')
    fse
      .ensureDir(uploadPath)
      .then(() => {
        cb(null, uploadPath)
      })
      .catch((err) => {
        cb(err, uploadPath)
      })
  },
  filename: (req, file, cb) => {
    const fileName = path.basename(file.originalname, path.extname(file.originalname))
    const fileExt = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${fileName}-${uniqueSuffix}${fileExt}`)
  }
})

export const uploadProduct = multer({
  storage: storageProduct,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 500,
    files: 100
  }
})

const storagePost = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/images/uploads/posts/temporary')
    fse
      .ensureDir(uploadPath)
      .then(() => {
        cb(null, uploadPath)
      })
      .catch((err) => {
        cb(err, uploadPath)
      })
  },
  filename: (req, file, cb) => {
    const fileName = path.basename(file.originalname, path.extname(file.originalname))
    const fileExt = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${fileName}-${uniqueSuffix}${fileExt}`)
  }
})

export const uploadPost = multer({
  storage: storagePost,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 500,
    files: 1
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/images/uploads/posts/posts')
    fse
      .ensureDir(uploadPath)
      .then(() => {
        cb(null, uploadPath)
      })
      .catch((err) => {
        cb(err, uploadPath)
      })
  },
  filename: (req, file, cb) => {
    const fileName = path.basename(file.originalname, path.extname(file.originalname))
    const fileExt = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${fileName}-${uniqueSuffix}${fileExt}`)
  }
})

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 500,
    files: 1
  }
})

export const removeUploadedFiles = (req: Request) => {
  const deleteFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Không thể xóa file: ${filePath}`, err)
        }
      })
    }
  }

  if (req.file) {
    const filePath = path.resolve(req.file.path)
    deleteFile(filePath)
  }

  if (req.files) {
    if (Array.isArray(req.files)) {
      req.files.forEach((file) => deleteFile(path.resolve(file.path)))
    } else {
      Object.values(req.files).forEach((fileArray) => {
        ;(fileArray as Express.Multer.File[]).forEach((file) => deleteFile(path.resolve(file.path)))
      })
    }
  }
}

export const compressImage = async (
  inputPath: string,
  originalFilename: string
): Promise<{ path: string; filename: string }> => {
  let sharpInstance = sharp(inputPath)

  const metadata = await sharpInstance.metadata()
  if (metadata.width && metadata.width > 1920) {
    sharpInstance = sharpInstance.resize(1920, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
  }

  const nameWithoutExt = path.parse(originalFilename).name
  const webpFilename = `${nameWithoutExt}.webp`
  const outputDir = path.dirname(inputPath)
  const outputPath = path.join(outputDir, webpFilename)

  await sharpInstance.webp(WEBP_CONFIG).toFile(outputPath)

  return {
    path: outputPath,
    filename: webpFilename
  }
}
