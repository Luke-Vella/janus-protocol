import classes from "./main-header.module.css";

function MainHeader({ onCreatePost }) {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>React Poster</h1>
      <p>
        <button className={classes.button} onClick={onCreatePost}>
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;
