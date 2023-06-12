import { Container, Box } from '@chakra-ui/react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import { useState } from 'react';
import KeywordsModal from './components/KeywordsModal';

function App() {
  const [keywords, setKeywords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractKeywords = async (text: string) => {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
          'Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n' +
          text +
          '',
        temperature: 0.5,
        max_tokens: 60,
        presence_penalty: 0.0,
      }),
    };

    try {
      const res = await fetch(import.meta.env.VITE_OPENAI_URL, options);
      const json = await res.json();
      const data = json.choices[0].text.trim();
      setKeywords(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg={'blue.600'} color={'white'} height={'100vh'} paddingTop={130}>
      <Container maxW={'3xl'} centerContent>
        <Header />
        <TextInput extractKeywords={extractKeywords} />
      </Container>
      <KeywordsModal keywords={keywords} loading={loading} isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </Box>
  );
}

export default App;
