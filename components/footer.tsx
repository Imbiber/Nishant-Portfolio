export default function Footer() {
  return (
    <footer className="bg-black border-t border-purple-500/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              &lt;Nishant/&gt;
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Software Developer at Broadridge passionate about building scalable solutions and contributing to open
              source.
            </p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                🟢 Available for opportunities
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Experience", "Skills", "Projects", "Achievements", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Specializations</h4>
            <ul className="space-y-2 text-gray-400">
              <li>• Backend Development</li>
              <li>• Full Stack Applications</li>
              <li>• Database Design</li>
              <li>• DevOps & Monitoring</li>
              <li>• Open Source Contribution</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Nishant Gaurav. Built with ❤️ using Next.js, TypeScript & Tailwind CSS
          </p>
          <p className="text-gray-500 text-sm mt-2">
            "Code is poetry written in logic" - Let's create something amazing together!
          </p>
        </div>
      </div>
    </footer>
  )
}
