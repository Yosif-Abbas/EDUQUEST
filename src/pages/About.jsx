import { Award, BookOpen, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';

function About() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="from-main-txt to-main-txt/85 relative bg-gradient-to-r py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              About EduQuest
            </h1>
            <p className="text-xl text-blue-100">
              Transforming education through innovative learning experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              At EduQuest, we believe that education should be accessible,
              engaging, and transformative. Our platform connects passionate
              educators with eager learners, creating a dynamic ecosystem where
              knowledge flows freely and learning knows no bounds.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Choose EduQuest?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <BookOpen className="text-main-txt mb-4 h-12 w-12" />
              <h3 className="mb-3 text-xl font-semibold">Quality Content</h3>
              <p className="text-gray-600">
                Expert-curated courses designed to provide comprehensive
                learning experiences
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <Users className="text-main-txt mb-4 h-12 w-12" />
              <h3 className="mb-3 text-xl font-semibold">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals and experienced educators
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <Award className="text-main-txt mb-4 h-12 w-12" />
              <h3 className="mb-3 text-xl font-semibold">Certification</h3>
              <p className="text-gray-600">
                Earn recognized certificates to showcase your achievements
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <Target className="text-main-txt mb-4 h-12 w-12" />
              <h3 className="mb-3 text-xl font-semibold">Flexible Learning</h3>
              <p className="text-gray-600">
                Study at your own pace with 24/7 access to course materials
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-main-txt py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-4xl font-bold">10K+</h3>
              <p className="text-blue-100">Active Students</p>
            </div>
            <div>
              <h3 className="mb-2 text-4xl font-bold">500+</h3>
              <p className="text-blue-100">Courses Available</p>
            </div>
            <div>
              <h3 className="mb-2 text-4xl font-bold">95%</h3>
              <p className="text-blue-100">Student Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Ready to Start Learning?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Join thousands of students who are already transforming their lives
            through education
          </p>
          <button className="bg-main-txt hover:bg-main-txt/85 rounded-lg px-8 py-3 font-semibold text-white transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </main>
  );
}

export default About;
