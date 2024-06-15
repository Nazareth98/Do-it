import { createContext, useState } from "react";

import { deleteData, getData, postData } from "../services/API";
import { MemberType } from "../types/memberTypes";

interface MemberContext {
  memberData?: MemberType[];
  updateData: () => void;
  createMember: (body: any) => Promise<any> | void;
  deleteMember: (id: number) => Promise<any> | void;
}

const initialState: MemberContext = {
  memberData: undefined,
  updateData: () => {},
  createMember: () => {},
  deleteMember: () => {},
};

const memberContext = createContext<MemberContext>(initialState);

const MemberContextProvider = ({ children }: any) => {
  const [memberData, setMemberData] = useState<MemberType[]>();

  async function deleteMember(id: number) {
    try {
      const endpoint = `/member/${id}`;
      const result = await deleteData(endpoint);
      if (result.response) {
        return result.response.data;
      } else {
        setMemberData(result.result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMembers() {
    try {
      const endpoint = "/member";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const data = await getMembers();
      setMemberData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createMember(body) {
    try {
      const endpoint = "/member";
      const result = await postData(endpoint, body);
      if (result.response) {
        return result.response.data;
      } else {
        setMemberData(result.result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <memberContext.Provider
      value={{ updateData, memberData, createMember, deleteMember }}
    >
      {children}
    </memberContext.Provider>
  );
};

export { memberContext, MemberContextProvider };
