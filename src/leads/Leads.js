export function Leads({ data }) {
  return (
    <section className="leads">
      <img src={data.img} alt={data.name} />
      <article>
        <p>{data.name}</p>
        <div>
          <div className="leadsDetail1">
            <p>Phone: {data.Phone}</p>
            <p>Comapny: {data.company}</p>
            <p>Email: {data.email}</p>
          </div>
          <div className="leadsDetail2">
            <p>Title: {data.title}</p>
            <p>Lead Source: {data.leadSource}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
