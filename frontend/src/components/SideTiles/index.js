import "./sidetiles.css";

const SideTiles = () => {
  return (
    <>
      <div className="sidetiles-container">
        <div className="sidetiles-topic">
          <div className="sidetiles-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="sidetiles-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
              />
            </svg>{" "}
            <h3>Projects</h3>
          </div>
          <hr className="sidetiles-hr"></hr>
          <div className="sidetiles-content">
            <ul className="sidetiles-ul">
              <a
                href="https://taskless.onrender.com/"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="sidetiles-gif"
                  src="../../../gif/taskless.gif"
                  alt=""
                />
                Taskless
              </a>
              <a
                href="https://petsagram-app.herokuapp.com/"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="sidetiles-gif"
                  src="../../../gif/pets.gif"
                  alt=""
                />
                Petsagram
              </a>
            </ul>
          </div>
        </div>
        <div className="sidetiles-topic">
          <div className="sidetiles-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="sidetiles-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3>Get to know me</h3>
          </div>
          <hr className="sidetiles-hr"></hr>
          <div className="sidetiles-content">
            <ul className="sidetiles-ul">
              {/* <a
                href="https://docs.google.com/document/d/e/2PACX-1vRjkM5PTL815-Byuka7JK1QOfsWO61j5cMf9E11vJoCipJFOZeddUc29OopeFpdOxR3YtyYoQrHzwmn/pub"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxs-file-pdf"></i>
                Resume
              </a> */}
              <a
                href="/pdfs/Software Engineer Vu Co.pdf"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxs-file-pdf"></i>
                Resume
              </a>
              <a
                href="https://vth-co.github.io/"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxs-folder-open"></i>
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/vu-co/"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxl-linkedin-square"></i>
                Linkedin
              </a>
              <a
                href="https://github.com/vth-co/MusicStratus"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bx bxl-github"></i>
                Github
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideTiles;
