import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileStorageGetter } from "../utils/LocalStorageEncryption";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    (async()=>{
      const userdata = JSON.parse(((await UserProfileStorageGetter('user_credentials_config')).data))
      console.log(userdata.role)
      if(userdata.role === "user"){
        navigate('/')
      }
    })()
  }, [])


  return <>
  <h2>Welcome to Admin Panel</h2>
  asdfasd
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate atque optio nam sed aperiam. Ullam architecto quasi aut error dolores sit, voluptas corrupti id tempore ipsum iure, dolore minus reprehenderit! Ex quod labore dolore accusamus error, ipsam delectus, aspernatur maxime veritatis, quisquam doloribus consequuntur corporis mollitia modi illum reiciendis itaque temporibus in et voluptates repellendus? Ut, itaque iure quasi quibusdam iusto earum. Tempore animi rerum natus nulla exercitationem omnis nobis accusantium non facere, blanditiis placeat dicta, saepe mollitia odio dolores? Odit, rem eius mollitia aliquam quas reiciendis recusandae adipisci voluptatum. Aliquid pariatur, recusandae, accusantium sint, eos blanditiis natus aspernatur laborum nemo deserunt corporis perspiciatis asperiores illum sit est in. Dignissimos porro blanditiis, labore consequatur, fugiat sapiente tempora iste dolores vero quibusdam omnis laborum maxime atque praesentium, quidem debitis harum! Corrupti tenetur consectetur autem officia. Voluptas nihil consectetur, nesciunt officia delectus quaerat, consequatur dignissimos, numquam porro iure mollitia quibusdam vitae itaque. Debitis ad odio unde eos nesciunt rem optio ipsam, ut, recusandae sint neque aut incidunt labore ratione aperiam earum. Amet accusamus aliquam voluptatum voluptatibus quod, enim a laborum libero maxime illum beatae modi fuga iste mollitia aliquid impedit nisi nostrum neque, sit quam. Iusto, atque? Illo ullam esse eos. Aliquam, eligendi nulla. Dignissimos impedit voluptate totam, delectus neque aspernatur molestiae suscipit porro saepe rem ipsum facere soluta eveniet! Eaque similique non ducimus aperiam impedit repellendus facere voluptatibus corrupti possimus sit id totam ullam quo expedita quia dignissimos neque ut minus a earum est, officia suscipit reiciendis! Fugiat minus hic ratione?

  </>;
};

export default AdminPanel;
