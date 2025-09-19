import { GraduationCap, PlayCircle, BookOpen, Award, Clock, Users, CheckCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function TrainingPage() {
  const courses = [
    {
      title: 'Getting Started with Enclose.AI',
      level: 'Beginner',
      duration: '2 hours',
      modules: 8,
      enrolled: '5,234',
      description: 'Learn the fundamentals of payment integration and get your first payment link live',
      color: 'from-green-500 to-teal-500',
      badge: 'Popular',
    },
    {
      title: 'Advanced API Integration',
      level: 'Advanced',
      duration: '4 hours',
      modules: 12,
      enrolled: '2,145',
      description: 'Master complex payment flows, webhooks, and custom checkout experiences',
      color: 'from-indigo-500 to-purple-500',
      badge: 'Technical',
    },
    {
      title: 'Security Best Practices',
      level: 'Intermediate',
      duration: '3 hours',
      modules: 10,
      enrolled: '3,892',
      description: 'Implement PCI compliance, fraud prevention, and secure payment handling',
      color: 'from-red-500 to-pink-500',
      badge: 'Essential',
    },
    {
      title: 'Building with Clients.AI',
      level: 'Intermediate',
      duration: '3.5 hours',
      modules: 11,
      enrolled: '4,567',
      description: 'Integrate Enclose.AI payments into your Clients.AI conversion agents',
      color: 'from-purple-500 to-indigo-500',
      badge: 'New',
    },
  ]

  const learningPaths = [
    {
      title: 'Developer Path',
      icon: <BookOpen className="h-6 w-6" />,
      courses: 8,
      duration: '20 hours',
      description: 'Complete developer training from basics to advanced implementations',
    },
    {
      title: 'Business Integration',
      icon: <TrendingUp className="h-6 w-6" />,
      courses: 6,
      duration: '15 hours',
      description: 'Learn to optimize payment flows for business growth',
    },
    {
      title: 'Security Specialist',
      icon: <Award className="h-6 w-6" />,
      courses: 5,
      duration: '12 hours',
      description: 'Master security, compliance, and fraud prevention',
    },
  ]

  const workshops = [
    {
      title: 'Live API Workshop',
      date: 'Every Tuesday',
      time: '2:00 PM EST',
      instructor: 'Sarah Chen',
      spots: '50 spots',
    },
    {
      title: 'Payment Optimization Clinic',
      date: 'Every Thursday',
      time: '3:00 PM EST',
      instructor: 'Mike Johnson',
      spots: '30 spots',
    },
    {
      title: 'Security Review Session',
      date: 'First Monday',
      time: '1:00 PM EST',
      instructor: 'Elena Rodriguez',
      spots: '25 spots',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Training & Certification
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build your expertise with comprehensive courses and hands-on workshops
            </p>
          </div>

          {/* Learning Paths */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Choose Your Learning Path</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <div key={path.title} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
                    {path.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.courses} courses
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Courses */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Featured Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.title} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                            {course.badge}
                          </span>
                        </div>
                        <p className="text-gray-600">{course.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {course.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.modules} modules
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.enrolled}
                      </span>
                    </div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2">
                      <PlayCircle className="h-5 w-5" />
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Workshops */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Live Workshops</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {workshops.map((workshop) => (
                <div key={workshop.title} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{workshop.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p>{workshop.date} • {workshop.time}</p>
                    <p>Instructor: {workshop.instructor}</p>
                    <p className="text-indigo-600">{workshop.spots} available</p>
                  </div>
                  <button className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Certification Program */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="h-12 w-12 mx-auto mb-6 text-white/90" />
              <h2 className="text-3xl font-bold mb-4">Enclose.AI Certified Developer</h2>
              <p className="text-xl mb-6 text-indigo-100">
                Validate your expertise and join an elite group of certified payment integration specialists
              </p>
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold mb-1">95%</div>
                  <div className="text-sm text-indigo-200">Pass Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">2,000+</div>
                  <div className="text-sm text-indigo-200">Certified Devs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">30%</div>
                  <div className="text-sm text-indigo-200">Salary Increase</div>
                </div>
              </div>
              <Link
                href="/certification"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <GraduationCap className="h-5 w-5" />
                Get Certified
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Link href="/docs" className="group bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <BookOpen className="h-8 w-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600 text-sm">Comprehensive guides and API references</p>
              <span className="text-indigo-600 text-sm group-hover:translate-x-1 transition-transform inline-block mt-2">
                Browse docs →
              </span>
            </Link>
            <Link href="/tutorials" className="group bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <PlayCircle className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm">Step-by-step video walkthroughs</p>
              <span className="text-indigo-600 text-sm group-hover:translate-x-1 transition-transform inline-block mt-2">
                Watch now →
              </span>
            </Link>
            <Link href="/sandbox" className="group bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Practice Sandbox</h3>
              <p className="text-gray-600 text-sm">Test integrations in a safe environment</p>
              <span className="text-indigo-600 text-sm group-hover:translate-x-1 transition-transform inline-block mt-2">
                Try sandbox →
              </span>
            </Link>
          </div>
        </div>
      </div>
  )
}