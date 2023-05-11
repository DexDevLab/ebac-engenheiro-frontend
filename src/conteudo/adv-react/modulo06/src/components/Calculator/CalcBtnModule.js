import SHBox from "../Styled/SHBox";
import SVBox from "../Styled/SVBox";
import CalcBtn from "./CalcBtn";

function CalcBtnModule({ inputProcessFn, activeKey, ...props }) {
  return (
    <>
      <SHBox>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"7"}
          onClick={() => {
            inputProcessFn("7");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"8"}
          onClick={() => {
            inputProcessFn("8");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"9"}
          onClick={() => {
            inputProcessFn("9");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"/"}
          onClick={() => {
            inputProcessFn("/");
          }}
        ></CalcBtn>
      </SHBox>
      <SHBox>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"4"}
          onClick={() => {
            inputProcessFn("4");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"5"}
          onClick={() => {
            inputProcessFn("5");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"6"}
          onClick={() => {
            inputProcessFn("6");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"X"}
          onClick={() => {
            inputProcessFn("*");
          }}
        ></CalcBtn>
      </SHBox>
      <SHBox>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"1"}
          onClick={() => {
            inputProcessFn("1");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"2"}
          onClick={() => {
            inputProcessFn("2");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"3"}
          onClick={() => {
            inputProcessFn("3");
          }}
        ></CalcBtn>
        <CalcBtn
          activeKey={activeKey}
          h={"50px"}
          label={"-"}
          onClick={() => {
            inputProcessFn("-");
          }}
        ></CalcBtn>
      </SHBox>
      <SHBox>
        <SVBox h={1.8} marginBottom={"5px"} justify={"start"}>
          <SHBox justify={"start"}>
            <CalcBtn
              activeKey={activeKey}
              h={"50px"}
              w={"148px"}
              label={"0"}
              onClick={() => {
                inputProcessFn("0");
              }}
            ></CalcBtn>
            <CalcBtn
              activeKey={activeKey}
              h={"50px"}
              label={"."}
              onClick={() => {
                inputProcessFn(".");
              }}
            ></CalcBtn>
          </SHBox>
          <SHBox justify={"start"}>
            <CalcBtn
              activeKey={activeKey}
              onClick={() => {
                inputProcessFn("Del");
              }}
              h={"50px"}
              color={"error"}
              label={"Del"}
            ></CalcBtn>
            <CalcBtn
              activeKey={activeKey}
              h={"50px"}
              color={"success"}
              w={"148px"}
              label={"="}
              onClick={() => {
                inputProcessFn("=");
              }}
            ></CalcBtn>
          </SHBox>
        </SVBox>
        <CalcBtn
          activeKey={activeKey}
          h={"109px"}
          label={"+"}
          onClick={() => {
            inputProcessFn("+");
          }}
        ></CalcBtn>
      </SHBox>
    </>
  );
}

export default CalcBtnModule;
