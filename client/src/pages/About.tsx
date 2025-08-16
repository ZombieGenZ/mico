import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  MapPin, 
  Clock, 
  Target, 
  Eye, 
  Heart,
  CheckCircle,
  Star
} from 'lucide-react';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  const stats = [
    { icon: Clock, number: '15+', label: 'Năm kinh nghiệm' },
    { icon: Users, number: '2000+', label: 'Khách hàng tin tưởng' },
    { icon: Award, number: '500+', label: 'Xe công trình' },
    { icon: MapPin, number: '10+', label: 'Chi nhánh toàn quốc' },
  ];
  
  const values = [
    {
      icon: Target,
      title: 'Sứ mệnh',
      description: 'Cung cấp giải pháp xe công trình toàn diện, chất lượng cao với dịch vụ chuyên nghiệp, góp phần phát triển ngành xây dựng Việt Nam.',
    },
    {
      icon: Eye,
      title: 'Tầm nhìn',
      description: 'Trở thành đơn vị hàng đầu trong lĩnh vực cung cấp và cho thuê xe công trình tại Việt Nam, mở rộng ra khu vực Đông Nam Á.',
    },
    {
      icon: Heart,
      title: 'Giá trị cốt lõi',
      description: 'Chất lượng - Uy tín - Chuyên nghiệp. Luôn đặt lợi ích khách hàng lên hàng đầu và không ngừng cải tiến dịch vụ.',
    },
  ];
  
  const team = [
    {
      name: 'Nguyễn Văn An',
      position: 'Giám đốc điều hành',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '20 năm kinh nghiệm',
    },
    {
      name: 'Trần Thị Bình',
      position: 'Giám đốc kinh doanh',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '15 năm kinh nghiệm',
    },
    {
      name: 'Lê Văn Cường',
      position: 'Giám đốc kỹ thuật',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '18 năm kinh nghiệm',
    },
  ];
  
  const achievements = [
    'Top 10 đại lý xe công trình uy tín nhất Việt Nam',
    'Chứng nhận ISO 9001:2015 về hệ thống quản lý chất lượng',
    'Đại lý chính thức của các thương hiệu hàng đầu thế giới',
    'Giải thưởng "Doanh nghiệp tiêu biểu" năm 2023',
    'Hơn 2000 khách hàng tin tưởng và sử dụng dịch vụ',
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Về <span className="text-yellow-200">chúng tôi</span>
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Hơn 15 năm kinh nghiệm trong lĩnh vực cung cấp và cho thuê xe công trình
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Câu chuyện của chúng tôi
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Được thành lập vào năm 2009, Xe Công Trình VN bắt đầu từ một showroom nhỏ 
                  với mong muốn cung cấp những chiếc xe công trình chất lượng cao cho các 
                  doanh nghiệp xây dựng tại Việt Nam.
                </p>
                <p>
                  Qua hơn 15 năm phát triển, chúng tôi đã trở thành một trong những đại lý 
                  xe công trình uy tín nhất cả nước, với hệ thống 10 chi nhánh trải dài 
                  từ Bắc đến Nam và đội ngũ hơn 200 nhân viên chuyên nghiệp.
                </p>
                <p>
                  Chúng tôi tự hào là đại lý chính thức của các thương hiệu hàng đầu thế giới 
                  như Komatsu, Caterpillar, Hitachi, và nhiều thương hiệu uy tín khác.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Về chúng tôi"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-yellow-400 to-orange-400 text-white p-6 rounded-2xl shadow-lg">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-sm font-semibold">Năm kinh nghiệm</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Sứ mệnh & Tầm nhìn
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những giá trị cốt lõi định hướng mọi hoạt động của chúng tôi
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Đội ngũ lãnh đạo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những người dẫn dắt công ty với kinh nghiệm và tầm nhìn xa
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gradient-to-br from-yellow-400 to-orange-400"
                  />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 font-semibold mb-2">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.experience}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Thành tựu <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">nổi bật</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Những dấu mốc quan trọng trong hành trình phát triển
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4 bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700"
                >
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Những phản hồi tích cực từ khách hàng là động lực để chúng tôi phát triển
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Nguyễn Văn Minh',
                company: 'Công ty TNHH Xây dựng ABC',
                content: 'Dịch vụ chuyên nghiệp, xe chất lượng cao. Đã hợp tác nhiều năm và rất hài lòng.',
                rating: 5,
              },
              {
                name: 'Trần Thị Lan',
                company: 'Tập đoàn Xây dựng XYZ',
                content: 'Giá cả hợp lý, hỗ trợ kỹ thuật tốt. Sẽ tiếp tục hợp tác lâu dài.',
                rating: 5,
              },
              {
                name: 'Lê Văn Đức',
                company: 'Công ty CP Đầu tư Xây dựng DEF',
                content: 'Đội ngũ tư vấn nhiệt tình, xe giao đúng hẹn. Rất đáng tin cậy.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300">
                  <div className="flex items-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-5 w-5 ${
                          star <= testimonial.rating 
                            ? 'text-orange-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;