import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import IconAdmin from "../../assets/svg/iconAdmin";
import IconGroups from "../../assets/svg/iconGroups";
import CustomInput from "../../components/shared/customInput";
import CustomButton from "../../components/shared/customButton";
import IconVisibilityOn from "../../assets/svg/iconVisibilityOn";
import IconVisibilityOff from "../../assets/svg/iconVisibilityOff";
import { authContext } from "../../contexts/authContext";
import IconLogin from "../../assets/svg/iconLogin";

const themes = ["admin", "member"];

const loginSchema = z.object({
  username: z.string().min(1, "Username é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const ScreenLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { signInAsAdmin, signInAsMember } = useContext(authContext);

  const [isVisible, setIsVisible] = useState(false);

  const [theme, setTheme] = useState<string>(themes[0]);

  const handleChangeVisibility = () => {
    setIsVisible(!isVisible);
  };

  function toogleTheme(newTheme) {
    setTheme(newTheme);
  }

  async function handleLogin(data: LoginSchema) {
    const { username, password } = data;
    try {
      let results;
      if (theme === "member") {
        results = await signInAsMember(username, password);
      }

      if (theme === "admin") {
        results = await signInAsAdmin(username, password);
      }

      if (results && results.status !== 200) {
        alert(results.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }

  return (
    <div
      className={`bg-gray-900 w-[420px] p-12 rounded-lg flex flex-col gap-12 theme-${theme}`}
    >
      <div>
        <h1 className="font-heading text-5xl text-white font-bold text-center">
          Do It<span className="text-primary">.</span>
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="font-heading font-semibold text-white text-lg text-center">
          Como deseja fazer <span className="text-primary">login</span>?
        </p>
        <div className="flex gap-6 justify-center items-center h-[120px]">
          <div
            onClick={() => toogleTheme("admin")}
            className={`${
              theme === "admin"
                ? "w-28 bg-primary"
                : "w-24 bg-dark border-2 border-medium"
            } transition-all rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer`}
          >
            <IconAdmin
              width={`${theme === "admin" ? "50px" : "40px"}`}
              fill={`${theme === "admin" ? "fill-dark" : "fill-medium"}`}
            />
            <p
              className={`${
                theme === "admin" ? "text-dark" : "text-medium text-sm"
              } font-heading font-bold`}
            >
              admin
            </p>
          </div>
          <div
            onClick={() => toogleTheme("member")}
            className={`${
              theme === "member"
                ? "w-28 bg-primary"
                : "w-24 bg-dark border-2 border-medium"
            } transition-all rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer`}
          >
            <IconGroups
              width={`${theme === "member" ? "50px" : "40px"}`}
              fill={`${theme === "member" ? "fill-dark" : "fill-medium"}`}
            />
            <p
              className={`${
                theme === "member" ? "text-dark" : "text-medium text-sm"
              } font-heading font-bold`}
            >
              membro
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-2"
        >
          <div>
            <CustomInput
              register={register("username", { required: true })}
              placeholder="user.123"
              label="Username"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <CustomInput
              register={register("password", { required: true })}
              type={isVisible ? "text" : "password"}
              placeholder="********"
              label="Senha"
              icon={
                isVisible ? (
                  <IconVisibilityOn
                    width="25px"
                    fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                    onClick={handleChangeVisibility}
                  />
                ) : (
                  <IconVisibilityOff
                    width="25px"
                    fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                    onClick={handleChangeVisibility}
                  />
                )
              }
            />

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="w-full flex justify-center mt-8">
            <CustomButton type="submit">
              <IconLogin width="25px" fill="fill-dark" />
              entrar
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScreenLogin;
