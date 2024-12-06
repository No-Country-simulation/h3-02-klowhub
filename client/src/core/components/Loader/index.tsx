import css from './loader.module.css';

export default function Loader() {
  return (
    <div className={css.loaderRipple}>
      <div></div>
      <div></div>
    </div>
  );
}
