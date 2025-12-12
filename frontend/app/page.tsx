import Image from "next/image";

export default function Home() {
  return (
    <section className="mt-16 grid gap-10 items-center md:grid-cols-[2fr,1.5fr]">
      {/* Left Side Content */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500 mb-3">
          Welcome!
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I'm <span className="text-blue-500">Taha</span>.
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          I am a Software Engineer. In 2020, I graduated from MEF University as an Electrical and Electronics Engineer. I currently live in Essen/Germany. I have worked as a Software Engineer for 4 years. Developing and unit testing microservices, creating/developing CI/CD pipelines was my daily work.
          <br></br>
          <br></br>
          I am currently improving my DevOps Skills, working on Linux Administration, Github Actions and some cloud technologies like Terraform, Ansible, AWS.
        </p>
        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium 
                       hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                       transition"
          >
            My projects
          </a>

          <a
            href="/contact"
            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 
                       text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 
                       transition"
          >
            Contact me!
          </a>
        </div>
      </div>

      {/* Right Side Profile Card */}
      <div className="flex justify-center md:justify-end">
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br 
                       from-blue-500/40 via-purple-500/40 to-cyan-500/40 
                       blur-2xl"
          />
          <div className="relative w-full h-full rounded-3xl border border-white/10 
                          bg-gray-50 dark:bg-gray-900/80 shadow-xl 
                          flex flex-col items-center justify-center gap-4 p-4">

            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
              <Image
                src="/me.jpg"
                alt="Profile Picture"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold">Taha</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                DevOps & Cloud Enthusiast
              </p>
            </div>

            <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>⚙️ Backend</span>
              <span>🌐 DevOps</span>
              <span>☁️ Cloud</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {/* Project Card 1 */}
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 
                    bg-white dark:bg-gray-900 hover:shadow-xl 
                    transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2">Personal Website</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This personal website built with Next.js and Tailwind CSS for frontend, Golang for backend. Deployed on AWS, using GitHub Actions for CI/CD.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Technologies: Next.js, Tailwind CSS, Golang, AWS, GitHub Actions, Lambda, API Gateway, DynamoDB, S3, CloudFront, Route 53, ACM, Terraform.
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/tahatsahin/personal-website"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            GitHub →
          </a>
        </div>

        {/* Project Card 2 */}
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 
                    bg-white dark:bg-gray-900 hover:shadow-xl 
                    transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2">SmartEdu</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This is a smart education platform that offers to store and share educational resources like videos, documents, and interactive content.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Technologies: Node.js, Express, MongoDB, Terraform, Ansible, DigitalOcean Droplets/Loadbalancers, Nginx, Docker.
          </p>
          <a
            href="https://github.com/tahatsahin/SmartEdu"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            GitHub →
          </a>
        </div>

        {/* Project Card 3 */}
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 
                    bg-white dark:bg-gray-900 hover:shadow-xl 
                    transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2">IAC DigitalOcean</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Terraform repository to create droplet and serve static content using nginx.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Technologies: Terraform, DigitalOcean Droplets, Nginx.
          </p>
          <a
            href="https://github.com/tahatsahin/iac-digitalocean"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            GitHub →
          </a>
        </div>

      </div>

    </section>
  );
}
