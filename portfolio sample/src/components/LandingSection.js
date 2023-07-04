import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Radwa!";
const bio1 = "A Frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
<VStack spacing={16}> 
<VStack spacing={4} alignItems="center">
  <Avatar 
  src="https://scontent.fcai19-6.fna.fbcdn.net/v/t39.30808-6/294024084_1699576057066271_368974288511012838_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=p_ghHUJMmYQAX_1Gztd&tn=ONLPJ2TZU8m8fAQE&_nc_ht=scontent.fcai19-6.fna&oh=00_AfAr83v7jqEhAISzmkR0svXQr_I3ZOwfXblr1DsKCkQIUw&oe=63D95F64"
  size="2xl"
  name="radwa"
  />
  <Heading as="h4" size="m4" noOfLines={1}>
    {greeting}
  </Heading>
</VStack>
<VStack spacing={6}>
<Heading as="h1" size="3xl" noOfLines={1}>
    {bio1}
  </Heading>
  <Heading as="h1" size="3xl" noOfLines={1}>
    {bio2}
  </Heading>
</VStack>
</VStack>
  </FullScreenSection>
);

export default LandingSection;
