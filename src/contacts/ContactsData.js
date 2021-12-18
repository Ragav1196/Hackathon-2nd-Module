import { Contacts } from "./Contacts";

export function ContactsData() {
  const contactsData = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      name: "Ragavendiran Panchatsharam",
      Phone: "99999 99999",
      company: "Rangoni Of Florence",
      email: "ragavendiran@gmail.com",
      title: "VP Accounting",
      leadSource: "Cold Call",
    },
  ];
  return (
    <section className="contactsData">
      {contactsData.map((data) => (
        <Contacts data={data} />
      ))}
    </section>
  );
}
