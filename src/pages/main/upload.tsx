import {
    Text,
    Box,
    Divider,
    Input,
    Button,
    Textarea,
    VStack,
    HStack,
    Flex,
    flexbox,
  } from "@chakra-ui/react";

  import { SetStateAction, useState, useRef } from "react";
  
  export function Upload() {
    const inputRef = useRef();

    const [audioFile, setAudioFile] = useState(null);
    const [description, setDescription] = useState("");
  
    const handleFileChange = (event: { target: { files: SetStateAction<null>[]; }; }) => {
      setAudioFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
    
    };
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        backgroundColor="#1f1f1f"
        padding={{ base: "12px", md: "24px" }}
        minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
        overflowX="hidden"
      >       
        <VStack
          spacing={0}
          alignItems="start"
          width={{ base: "100%", md: "65%" }}
          margin="0 auto"
            >
            <Text
                fontSize={{ base: "24px", md: "36px" }}
                fontWeight="bold"
                color="white"
                >
                Envie seu Podcast
            </Text>

      

            <Text
                marginBottom={8}
                fontSize={{ base: "14px", md: "16px" }}
                color="white"
                >
                Faça o upload do seu podcast para milhares de pessoas ouvirem.
            </Text>


            <input type="file" accept="audio/*" style={{display: "none"}}/>
            <HStack
                marginBottom={8}
                display={"flex"}
                flexDirection={"row"}
                alignItems="center"
                justifyContent="start"
                width={{ base: "100%", md: "100%" }}
                
                >
                <Button
                    flex={1}
                    color="white"
                    backgroundColor="#004aad"
                    colorScheme="#004aad"
                    width="full"
                    >
                    Selecionar Arquivo
                </Button>

                <Textarea
                   flex={2}
                   placeholder="Digite uma breve descrição do áudio"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   backgroundColor="white"
                   color="black"
                   resize="none"
                   height="150px"
                />

            </HStack>

            <Button
               color="white"
               backgroundColor="#004aad"
               colorScheme="#004aad"
               width="full"

                >
               Fazer Upload
            </Button>
        </VStack>
      </Box>
    );
  }
  