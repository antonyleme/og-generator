import { Box, Image, Flex, FormControl, FormLabel, Input, Button, Stack, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import degrade from './assets/degrade.png';
import OgJPG from './assets/fundojpg.jpg'
import LogoSVG from './assets/logo.svg'
import * as htmlToImage from 'html-to-image';

function App() {
  const [title, setTitle] = useState('Page Title');
  const [path, setPath] = useState('path-here')
  const [bg, setBg] = useState('');

  const toBase64 = async (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  
  const updateFile = async function(file){
    const data = await toBase64(file);
    setBg(data);
  }

  const printRef = React.useRef();

  const handleDownloadImage = async () => {

    htmlToImage.toPng(document.getElementById('og-wrapper'))
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = `${path}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <Box p='32px'>
      <Box p='32px' mb='32px' w='700px' mx='auto'>
        <Stack spacing='16px'>
          <HStack>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input value={title} onChange={e => setTitle(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>Path</FormLabel>
              <Input value={path} onChange={e => setPath(e.target.value)}/>
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>Imagem</FormLabel>
            <Input type='file' onChange={e => e.target.files.length ? updateFile(e.target.files[0]) : null}/>
          </FormControl>
          <Button onClick={handleDownloadImage} type='submit' colorScheme='blue'>Download</Button>
        </Stack>
      </Box>

    <Flex justifyContent='center'>
      <Box ref={printRef} id='og-wrapper'>
        <Box pos='relative' w='1200px'>
          <Image position='absolute' src={LogoSVG} zIndex='10000'/>
          <Image src={OgJPG}/>
          <Flex 
            textAlign='center' position='absolute'
            top='0'
            right='0'
            bottom='0'
            left='0'
            zIndex='200'
            color='white'
            justifyContent='center'
            alignItems='center'
            fontFamily='Roboto'
          >
            <Box textAlign='center' pt='70px' position='relative' zIndex='10000'>
              <Box mb='15px'>
                <Box pb='0px' display='inline-block' fontWeight='600' fontSize='80px' px='10%' borderBottom='2px solid white'>
                  {title}
                </Box>
                {/* <Box mb='12px' mx='auto' w='116%' h='2px' bg='white' ml='-8%'/> */}
              </Box>
              <Box whiteSpace='nowrap' textTransform={'uppercase'} fontSize='35px'>
                WWW.AFLDS.ORG/<strong>{path}</strong>
              </Box>
            </Box>
          </Flex>

          <Box left='calc(50% - 11.5px)' transform={'translateX(-50%)'} position='absolute' bottom='0' 
          w='948px' h='578px' bgImage={bg} bgSize='100%'/>
          <Image 
            pos='absolute' 
            top='0' 
            left='0' 
            right='0' 
            bottom='0' 
            src={degrade}
            zIndex='100'
            blendMode={'multiply'}
          />
        </Box>
      </Box>
    </Flex>
    </Box>
  );
}

export default App;
