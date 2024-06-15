import SvgType from "../../types/svgType";

const IconLogin = (props: SvgType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={props.fill ? props.fill : "fill-black"}
      height={props.width ? props.width : "30px"}
      width={props.width ? props.width : "30px"}
    >
      <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
    </svg>
  );
};

export default IconLogin;
