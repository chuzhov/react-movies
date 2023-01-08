import css from './Ribbon.module.css';

const Ribbon = ({ id }) => {
  return (
    <div
      className={css['ribbon']}
      onClick={e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        debugger;
        console.log('Click-click');
      }}
    ></div>
  );
};

export default Ribbon;
