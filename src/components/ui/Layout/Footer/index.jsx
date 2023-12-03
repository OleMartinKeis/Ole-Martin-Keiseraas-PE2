import React from "react";

function Footer() {
  return (
    <footer className="bg-primary bottom-0 pt-4 pb-4 w-100">
      <div className="grid md:grid-cols-2">
        <div>
          <p className="text-sm md:text-base">
            This is not a real venue booking page. <br></br>This is a task
            created for Noroff by
            <a
              href="https://github.com/OleMartinKeis"
              className="border-b border-accent hover:text-accent font-bold ml-1"
            >
              Ole Martin Keiseraas
            </a>
            .
          </p>
        </div>
        <div className="">
          <p className="text-sm md:text-base">
            All rights reserved &copy; <strong> 2023 VenueVista</strong>.
          </p>
          <div>
            <a href="https://github.com/OleMartinKeis">
              <i className="fa fa-github text-xl sm:text-3xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/ole-martin-keiseraas-615a19152/">
              <i className="fa fa-linkedin-square text-xl sm:text-3xl ml-3"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
