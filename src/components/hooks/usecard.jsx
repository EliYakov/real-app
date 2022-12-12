import { useEffect } from "react";
import { useState } from "react";
import cardsService from "../service/cardsService";

export const useCard = (id) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const getCard = async () => {
      const { data } = await cardsService.getCard(id);

      setCard(data);
    };

    getCard();
  }, []);

  return card;
};
