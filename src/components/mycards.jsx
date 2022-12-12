import { useMyCards } from "./hooks/useMyCards";
import PageHeader from "./common/pageheader";
import { Link } from "react-router-dom";
import Card from "./card";
const MyCards = () => {
  const cards = useMyCards();

  return (
    <>
      <PageHeader
        title="My Cards"
        Description="Your cards is showing below in the list"
      />

      <div className="row">
        <Link to="/create-cards">Create New Card</Link>
      </div>

      <div className="row">
        {!cards.length ? (
          <p>No Cards..</p>
        ) : (
          cards.map((card) => <Card key={card._id} card={card} />)
        )}
      </div>
    </>
  );
};

export default MyCards;
