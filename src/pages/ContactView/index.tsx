import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Banner from '../../components/Banner';
import { Container, Content } from './styled';

import ContactContent, { Contact } from '../../components/ContactContent';
import api from '../../services/api';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import contactSvg from '../../assets/contact.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import LoadingSubmit from '../../components/LoadingSubmit';

const Projects: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [contacts, setContacts] = useState<Contact>({} as Contact);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [wpp, setWpp] = useState('');

  useEffect(() => {
    let isCanceled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await api.get('contacts');

        if (!isCanceled) {
          setContacts(response.data);
          setLoading(false);
        }
      } catch {
        if (!isCanceled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('Email inválido')
          .required('Email obrigatório'),
        whatsapp: Yup.string().required('WhatsApp obrigatório'),
        subject: Yup.string().required('Assunto obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoadingSubmit(true);
      await api.post('/mail-contact', data);
      formRef.current?.reset();

      toast('E-mail enviado com sucesso.', {
        type: 'success',
      });
      setLoadingSubmit(false);
    } catch (err) {
      setLoadingSubmit(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      if (err.response.status === 400) {
        toast('Algo saiu errado, talvez o título já esteja em uso.', {
          type: 'error',
        });
        return;
      }

      toast('Algo saiu errado, tente novamente.', {
        type: 'error',
      });
    }
  }, []);

  const handleValidate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // (88) 9 8888.8888
    let number = '';

    number = e.target.value.replace(/\D/g, '');

    if (number.length < 11) {
      setWpp(number);
      return;
    }

    const numberArray = number.split('');
    const n1 = numberArray.slice(0, 2).join('');
    const n2 = numberArray.slice(2, 3).join('');
    const n3 = numberArray.slice(3, 7).join('');
    const n4 = numberArray.slice(7, 11).join('');

    number = `(${n1}) ${n2} ${n3}-${n4}`;

    setWpp(number);
  }, []);

  return (
    <>
      <Banner title="CONTATO" subTitle="Vamos bater um papo?" />
      <Container>
        {loading && <Loading />}
        <Content>
          {contacts.id && (
            <>
              <div className="contacts">
                <div>
                  <h2>Escolha a melhor opção</h2>
                  <ContactContent contacts={contacts} />
                </div>
                <img src={contactSvg} alt="" />
              </div>

              <div className="form">
                <h2>
                  Se preferir preencha seus dados que entrarei em contato.
                </h2>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input name="name" label="Nome:" />
                  <Input name="email" label="E-mail:" />
                  <Input
                    name="whatsapp"
                    label="WhatsApp:"
                    onChange={(e) => handleValidate(e)}
                    value={wpp}
                  />
                  <Textarea name="subject" label="Assunto:" />

                  <div>
                    {loadingSubmit ? (
                      <LoadingSubmit />
                    ) : (
                      <Button type="submit">Enviar</Button>
                    )}
                  </div>
                </Form>
              </div>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Projects;
