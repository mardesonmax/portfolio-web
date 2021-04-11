import React from 'react';

import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

import { Container } from './styled';

export interface Contact {
  id?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  whatsapp?: string;
  github?: string;
  linkedin?: string;
}

interface Props {
  contacts: Contact;
}

const ContactContent: React.FC<Props> = ({ contacts }) => {
  return (
    <Container>
      {contacts.facebook && (
        <a href={contacts.facebook} target="_blank" rel="noopener noreferrer">
          <span>
            <FaFacebook />
          </span>
        </a>
      )}

      {contacts.instagram && (
        <a href={contacts.instagram} target="_blank" rel="noopener noreferrer">
          <span>
            <FaInstagram />
          </span>
        </a>
      )}

      {contacts.whatsapp && (
        <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer">
          <span>
            <FaWhatsapp />
          </span>
        </a>
      )}

      {contacts.linkedin && (
        <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
          <span>
            <FaLinkedin />
          </span>
        </a>
      )}

      {contacts.github && (
        <a href={contacts.github} target="_blank" rel="noopener noreferrer">
          <span>
            <FaGithub />
          </span>
        </a>
      )}

      {contacts.twitter && (
        <a href={contacts.twitter} target="_blank" rel="noopener noreferrer">
          <span>
            <FaTwitter />
          </span>
        </a>
      )}

      {contacts.email && (
        <a
          href={`mailton:${contacts.email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <FaEnvelope />
          </span>
        </a>
      )}
    </Container>
  );
};

export default ContactContent;
