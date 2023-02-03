import Image from "next/image";
import ColorsSlider from "../slider/colors";
import {Modal, notification} from "antd";
import React, {useEffect, useState} from "react";
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import axios from "axios";
import {getUserInfo} from "../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import Avatars from "../slider/avatars";
import getChosenAvatar from "../../../components/getChosenAvatar";

export default function AddBalance({isOpenModalAddBalance, setIsOpenModalAddBalance}) {

  const [tabIndex, setTabIndex] = useState<number>(1);

  return (
      <Modal
          className={"checkoutModal"}
          open={isOpenModalAddBalance}
          onCancel={() => setIsOpenModalAddBalance(false)}
          footer={""}
          title={""}
          width={637}>

        <div className={"flex flex-col space-y-5"}>
          <h3 className={"aveSofBold text-[18px] text-[#383838]"}>ბალანსის შევსება</h3>
          <div className={"w-full h-[57px] p-[3px] flex bg-[#EDEEEF] rounded-xl relative"}>
            <div className={"absolute rounded-[8px] w-[50%] bg-[#8338EC]"}
                 style={{
                   height: "calc(100% - 6px)",
                   transition: "0.3s cubic-bezier(0, 0, 0.58, 1)",
                   left: "0%",
                   transform: tabIndex === 1 ? "translateX(calc(0% + 3px))" : "translateX(calc(100% - 3px))"
                 }}
            />

            <div onClick={() => setTabIndex(1)}
                 className={"w-[50%] z-10 rounded-[8px] flex justify-center items-center"}>
              <p className={"text-base"}
                 style={{
                   transition: "0.2s linear all",
                   color: tabIndex === 1 ? "white" : "#383838"
                 }}
              >ინტერნეტ ბანკი</p>
            </div>
            <div onClick={() => setTabIndex(2)}
                 className={"w-[50%] z-10  rounded-[8px] flex justify-center items-center"}>
              <p
                  className={"text-base"}
                  style={{
                    transition: "0.2s linear all",
                    color: tabIndex === 2 ? "white" : "#383838"
                  }}
              >სწრაფი გადახდის აპარატი</p>
            </div>
          </div>

          {
            tabIndex === 1 ? <div className={"space-y-5"}>
              <div className={"bg-[#F2F2F2B2] flex justify-between py-[18px] px-[38px] rounded-xl cursor-pointer"}>
                <Image
                    alt={"tbc"}
                    src={IMAGES.tbc}
                    height={28}
                    width={28}
                />
                <p className={"text-center text-[#0F0E0E] text-base aveSofMedium"}>თიბისი ბანკი</p>
                <div className={"w-[28px]"}></div>
              </div>
              <div className={"bg-[#F2F2F2B2] flex justify-between py-[18px] px-[38px] rounded-xl cursor-pointer"}>
                <Image
                    alt={"bog"}
                    src={IMAGES.bog}
                    height={28}
                    width={28}
                />
                <p className={"text-center text-[#0F0E0E] text-base aveSofMedium"}>საქართველოს ბანკი</p>
                <div className={"w-[28px]"}></div>
              </div>
            </div> : <div>
              <p>
                შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან
                მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის
                შესრულებისას საჩვენებელია, თუ როგორი იქნება ტექსტის ბლოკი. სწორედ ასეთ დროს არის მოსახერხებელი ამ
                გენერატორით შექმნილი ტექსტის გამოყენება, რადგან უბრალოდ „ტექსტი ტექსტი ტექსტი“ ან სხვა გამეორებადი
                სიტყვების ჩაყრა, ხელოვნურ ვიზუალურ სიმეტრიას ქმნის და არაბუნებრივად გამოიყურება.
              </p>
            </div>
          }


        </div>

      </Modal>
  );
}
