import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { BASE_API } from "../helper/Constants";
import NumberModal from "../components/models/NumberModal";
import ReactLoading from "react-loading";

const Cards = ({ isLocal }) => {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_API}api/get-phone-numbers?is_local=${isLocal ? '1' : '0'}`);
        const data = await response.json();
    
        const updatedNumbers = data.data.map((phone) => ({
          ...phone,
          price: phone.price,
        }));
    
        setNumbers(updatedNumbers);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching ${isLocal ? 'local' : 'toll-free'} numbers:`, error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isLocal]);

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
      const updatedTotalPrice = parseFloat(selectedNumber.price);
      setTotalPrice(updatedTotalPrice);
    }
  }, [selectedNumber]);

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center my-5">
          <ReactLoading type="spokes" color="grey" height={50} width={50} />
        </div>
      )}
      {!isLoading && (
       <div className="custom-card-container">
       {numbers.length > 0 ? (
         numbers.map((number, index) => (
           <Card
             key={index}
             className="custom-card"
             onClick={() => openModal(number)}
           >
             <Card.Body>
               <Card.Text className="smaller-price">{`$${number.price}`}</Card.Text>
               <Card.Title>{number.mobile_number}</Card.Title>
             </Card.Body>
           </Card>
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