import { useContext, useEffect } from "react";
import ScreenTitle from "../../components/shared/screenTitle";
import { memberContext } from "../../contexts/memberContext";
import MemberList from "../../components/memberList";
import MemberForm from "../../components/memberForm";
import { authContext } from "../../contexts/authContext";

const ScreenMember = () => {
  const { updateData } = useContext(memberContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    function lodaData() {
      updateData();
    }

    lodaData();
  }, []);

  return (
    <div
      className={`fade-left w-full h-full pl-12 pt-8 pr-8 pb-8 flex flex-col gap-8 theme-${user.type}`}
    >
      <ScreenTitle>
        Gerencie seus <span className="text-primary">membros</span>
      </ScreenTitle>
      <div className="w-full flex gap-8">
        <MemberForm />
        <MemberList />
      </div>
    </div>
  );
};

export default ScreenMember;
