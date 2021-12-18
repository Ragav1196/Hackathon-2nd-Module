export function Contacts({ data }) {
  return (
    <section className="contacts">
      <img src={data.img} alt={data.name} />
      <article>
        <p>{data.name}</p>
        <div>
          <div className="contactsDetail1">
            <p>Phone: {data.Phone}</p>
            <p>Comapny: {data.company}</p>
            <p>Email: {data.email}</p>
          </div>
          <div className="contactsDetail2">
            <p>Title: {data.title}</p>
            <p>Lead Source: {data.leadSource}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
