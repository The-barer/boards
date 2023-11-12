import { useEffect, useState } from "react";
import "../Styles/PersonalInfo.css";

import { useAppSelector } from "../Hooks/reduxHooks";
import { UserFormField } from "../Components/UserFormField";
import { IPlainObject } from "../Types/types";
import { authService } from "../Services/auth.service";

export default function UserPage() {
  const user = useAppSelector((state) => state.user.user);
  const [updatePage, setUpdatePage] = useState(false);

  const [updatedData, setUpdatedData] = useState<IPlainObject>({});

  const handelChange = (key: string, value: string | boolean) => {
    const data: IPlainObject = {};
    data[key] = value;

    setUpdatedData({ ...updatedData, ...data });
  };

  const deletUpdate = (key: string) => {
    const update = updatedData;
    delete update[key];

    setUpdatedData({ ...update });
  };

  const handelSave = async () => {
    const user = await authService.updateUserInfo(updatedData);
    if (user) {
      setUpdatePage(true);
    }
  };
  useEffect(() => {
    if (updatePage === true) setUpdatePage(false);
  }, [updatePage]);
  return (
    <div>
      <h1>Информация о пользователе</h1>
      <div className="userGrid">
        {user &&
          !updatePage &&
          Object.entries(user).map((prop) => {
            return (
              <UserFormField
                key={prop[0]}
                data={{ key: prop[0], value: prop[1] }}
                handelChange={handelChange}
                deletUpdate={deletUpdate}
              />
            );
          })}
      </div>
      <button
        onClick={handelSave}
        disabled={Object.keys(updatedData).length === 0}
      >
        Сохранить все
      </button>
    </div>
  );
}
