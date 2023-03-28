import { FunctionComponent, useEffect, useState } from "react";
import { getUserProfile } from "../services/usersService";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  let [user, setUser] = useState<any>({});
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="container mx-auto text-center">
        <h1 className="display-1 text-center">My Profile</h1>
        <h3 className="display-3 text-center">
          Hello, {user?.name ?? "Stranger"}
        </h3>
        {user && (
          <>
            <h5>
              <strong> Id: </strong> {user?._id ?? ""}
            </h5>
            <h5>
              <strong> Email: </strong> {user?.email ?? ""}
            </h5>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
