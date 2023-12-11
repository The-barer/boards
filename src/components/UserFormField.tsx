import { faBan, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IPlainObject } from "../Shared/Lib/Types/types";

type UserInfoEdit = {
  data: {
    key: string;
    value: string | boolean | null;
  };
  handelChange: (key: string, value: string | boolean) => void;
  deletUpdate: (key: string) => void;
};
export const UserFormField = (Props: UserInfoEdit) => {
  const { data, deletUpdate, handelChange } = Props;
  const [newValue, setNewValue] = useState(data.value);
  const [edit, setEdit] = useState(false);
  const editable = ["photo", "userName"];
  const dict: IPlainObject = {
    email: "Email: ",
    authUserId: "ID сервиса авторизации: ",
    userName: "Имя пользователя: ",
    photo: "URL аватарки: ",
    isAvtiveted: "Статус активации аккаунта: ",
  };

  const canEdit = editable.includes(data.key);

  const handelEdit = (): void => {
    setEdit(!edit);
    if (newValue !== data.value) {
      setNewValue(data.value);
      deletUpdate(data.key);
      console.log("отмена редактирования, возврат исходного значения");
    }
  };

  const handelChekbox = (): void => {
    if (!edit) return;
    setNewValue(!newValue);
    handelChange(data.key, !newValue);
  };

  const hadelTextInput = (e: React.FormEvent<HTMLInputElement>) => {
    setNewValue(e.currentTarget.value);
    handelChange(data.key, e.currentTarget.value);
  };

  return (
    <div
      className="userField userName"
      style={
        newValue !== data.value
          ? { boxShadow: " #7de95252 0px 0px 5px 5px" }
          : {}
      }
    >
      <div className="fieldInfo ">
        {dict[data.key]}
        {typeof newValue === "boolean" ? (
          <input type="checkbox" onChange={handelChekbox} checked={newValue} />
        ) : (
          <span>
            {!edit ? (
              newValue
            ) : (
              <input
                type="text"
                value={newValue ? newValue : ""}
                onChange={hadelTextInput}
                name="newValueInput"
              />
            )}
          </span>
        )}
      </div>
      {canEdit && (
        <div className="fieldAction">
          {!edit ? (
            <FontAwesomeIcon icon={faPen} onClick={handelEdit} />
          ) : (
            <FontAwesomeIcon icon={faBan} onClick={handelEdit} />
          )}
        </div>
      )}
    </div>
  );
};
