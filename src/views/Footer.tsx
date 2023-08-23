import "./Footer.css";

export default function Footer(): JSX.Element {
  return (
    <footer>
      <nav>
        <a className="material-icons" href="https://hjfreyer.com">
          face
        </a>
        <a className="material-icons" href="mailto:yt@hjfreyer.com">
          email
        </a>
        <a
          className="material-icons"
          href="https://github.com/hjfreyer/pentris/issues"
        >
          report_problem
        </a>
        <a
          className="material-icons"
          href="https://github.com/hjfreyer/pentris"
        >
          code
        </a>
      </nav>
    </footer>
  );
}
