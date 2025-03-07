import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { BASE_API } from "../helper/Constants";
import NumberModal from "../components/models/NumberModal";
import ReactLoading from "react-loading";

const Cards = ({isLocal}) => {
  const [localNumbers, setLocalNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_API + `api/get-phone-numbers`);
        const data = await response.json();
        const updatedNumbers = data.data.map((phone) => {
          const price = phone.price ;
          return {
            ...phone,
            price: price,
          };
        });
    
        setLocalNumbers(updatedNumbers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching local numbers:", error);
      }
    };
    setIsLoading(false);
    fetchData();
  }, []);

  const openModal = (number) => {
    setSelectedNumber(number);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNumber(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedNumber) {
      const updatedTotalPrice = localNumbers.reduce((acc, curr) => {
        if (curr === selectedNumber) {
          return acc + parseFloat(curr.price);
        }
        return acc;
      }, 0);
      setTotalPrice(updatedTotalPrice);
    }
  }, [selectedNumber, localNumbers]);

  const cardsPerPage = 4;
  const pageCount = Math.ceil(localNumbers.length / cardsPerPage);

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center my-5">
          <ReactLoading type="spokes" color="grey" height={50} width={50} />
        </div>
      )}
      {!isLoading && (
        <div className="custom-card-container">
          {localNumbers.length > 0 ? (
            Array.from({ length: pageCount }, (_, i) => i).map((page, pageIndex) => (
              <div key={pageIndex} className="custom-card-container">
                {localNumbers
                  .slice(page * cardsPerPage, (page + 1) * cardsPerPage)
                  .map((number, index) => (
                    <Card
                      key={index}
                      className="custom-card"
                      onClick={() => openModal(number)}
                    >
                      <Card.Body>
                        <Card.Text className="smaller-price">{` $${number.price}`}</Card.Text>
                        <Card.Title>{number.mobile_number}</Card.Title>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            ))
          ) : (
            <p style={{ marginTop: "40px", textAlign: "center" }}>No data found</p>
          )}
          <NumberModal
            show={isModalOpen}
            onHide={closeModal}
            selectedNumber={selectedNumber} 
            crrPrice={totalPrice} 
          />
        </div>
      )}
    </>
  );
};

export default Cards;