import React from 'react';

const Home = () => {
  return (
    <>

      <div className="flex items-center justify-center h-[90vh] px-4">
        <section className="container text-center">
          <p className="text-3xl md:text-4xl font-bold mb-2">
            Beautiful layouts and components
          </p>
          <p className="text-3xl md:text-4xl font-bold mb-4">
            built with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
              Tailwind CSS
            </span>{" "}
            and{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-400">
              ShadCN UI
            </span>
            .
          </p>
          <p className="text-md md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            An open-source collection of reusable components and layouts to help you quickly build user interfaces.
          </p>
          <div className="space-x-4">
            <p className="text-xl">
              <span className="text-muted-foreground">aditya76-git</span>
              <span className="text-white">/fractus-ui</span>
            </p>
          </div>
        </section>
      </div>


    </>

  )
}

export default Home