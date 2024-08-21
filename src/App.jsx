import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
  return (
    <>
      <GlobalStyles />
      <Row>
        <div>
          <Heading>Hellllloooooo</Heading>
          <Heading as="h1">Hellllloooooo</Heading>
          <Heading as="h2">Helllllosfafooooo</Heading>
          <Heading as="h3">Helllllooodfdfdfssooo</Heading>
        </div>
      </Row>
      <div>3ello World</div>
    </>
  );
}

export default App;
