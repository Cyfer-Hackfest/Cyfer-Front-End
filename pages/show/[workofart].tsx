import * as React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

interface IWorkOfArtWidgetProps {}

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
`;

const ArtImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const ArtTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const ArtDescription = styled.p`
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 15px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  text-align: center;
  background-color: ${(props) => props.color || "#007bff"};
  color: white;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export default function WorkOfArtWidget(props: IWorkOfArtWidgetProps) {
  const router = useRouter();
  const [workOfArt, setWorkOfArt] = React.useState({
    token_id: router.query.workofart,
    image: "QmPUGHT9weoX9f9AqnB36Kc6dB8RPgeVBXivLDz7k8Wcse",
    name: "Starry Night",
    owner: "Vincent van Gogh",
    title: "Impressionist Masterpiece",
    description: "A stunning depiction of the night sky.",
    price: "$1,000",
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false); // State to manage modal open/close
  const [updatedPrice, setUpdatedPrice] = React.useState(workOfArt.price); // State to hold updated price

  React.useEffect(() => {
    // function to get work of art with token_id
    const getWorkOfArt = async () => {
      console.log(router.query.workofart);
    };

    getWorkOfArt();
  }, []);

  const handleBuyClick = () => {
    // Implement buy functionality
    alert(
      `Congratulations! You've purchased ${workOfArt.name} for ${workOfArt.price}.`
    );
  };

  const handleRemoveClick = () => {
    // Implement remove functionality
    alert(
      `Are you sure you want to remove ${workOfArt.name} from the collection?`
    );
  };

  // ...

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdatePrice = () => {
    // Implement logic to update the price
    // setUpdatedPrice(newPrice);
    handleModalClose();
  };

  return (
    <Container>
      <ArtImage
        src={`https://amethyst-disabled-tyrannosaurus-478.mypinata.cloud/ipfs/${workOfArt.image}`}
        alt={workOfArt.name}
      />
      <ArtTitle>{workOfArt.title}</ArtTitle>
      <p>By {workOfArt.owner}</p>
      <ArtDescription>{workOfArt.description}</ArtDescription>
      <p>Price: {workOfArt.price}</p>
      <ButtonContainer>
        <Button color="#28a745" onClick={handleBuyClick}>
          Buy
        </Button>
        <Button color="red" onClick={handleRemoveClick}>
          Remove
        </Button>
        <Button color="blue" onClick={handleUpdateClick}>
          Update
        </Button>
      </ButtonContainer>

      {/* modal */}
      {isModalOpen && (
        <ModalOverlay onClick={handleModalClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p>Update Price:</p>
            <input
              style={{
                width: "100%",
                marginBottom: 5,
                marginTop: 5,
                height: 50,
                border: "solid thin black",
                padding: 5,
              }}
              type="text"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
            <Button color="#28a745" onClick={handleUpdatePrice}>
              Confirm
            </Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
