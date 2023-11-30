// export default CompanyForm;
import React, { useState } from "react";
import InputMask from "react-input-mask";

import AlertComponent from "./AlertComponent";
const CompanyForm: React.FC = () => {
  const [nameClient, setNameClient] = useState("");
  const [nameFantasia, setNameFantasia] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nameGroup, setNameGroup] = useState("Autônomos");
  const [cpf, setCpf] = useState("");

  const [selectedOption, setSelectedOption] = useState("cnpj"); // Inicialmente CNPJ selecionado
  

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [maskPhone, setMaskPhone] = useState("(99) 9999-9999");
  const [shouldApplyMask, setShouldApplyMask] = useState(false);

  const [alertType, setAlertType] = useState<'success' | 'failure' | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleEmailBlur = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsEmailValid(emailPattern.test(email));
  };
  const handleSubmit =async (event:React.FormEvent) => {
    event.preventDefault();
    
    const data = {
      nameClient:nameFantasia?nameFantasia:nameClient,
      phone:phone.replace(/\D/g, ""),
      email,
      typeClient:'PJ',
      id_partner:'',
      cnpj:selectedOption==='cnpj'?cnpj:'',
      nameGroup,
      cpf:selectedOption==='cpf'?cpf:''
    }
    try {
      const response = await fetch('https://localhost:3000/public/indication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setNameClient('')
        setNameFantasia('')
        setPhone('')
        setEmail('')
        setCnpj('')
        setNameGroup("Autônomos")
        setCpf('')
        setSelectedOption("cnpj")
        setIsEmailValid(true)
        setShouldApplyMask(false)
        setAlertType('success');
        window.location.href = 'https://localhost:300/pagina-de-obrigado-confirmacao-conversao-google-ads'; 
      } else {
        console.error('Erro ao enviar o formulário');
        setAlertType('failure');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
      setAlertType('failure');
    }

  }
  const handleCloseAlert = () => {
    setAlertType(null);
  };


  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center "
      style={{
        backgroundImage: `url('/bg.jpeg')`, // Substitua pelo caminho da sua imagem
      }}>
  
      <form className="bg-white p-6 rounded-lg shadow-md max-h-[90vh] overflow-y-auto sm:w-[60vw] md:w-[60vw] lg:w-[34vw]  mx-2 my-2" onSubmit={(e)=>handleSubmit(e)}>
        <div className="mb-4 flex justify-center">
            <img src='/LogoKreed.png' alt="Logo" className="h-16" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Nome completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={nameClient}
            onChange={(e) => setNameClient(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#B853FF]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Escolha uma opção
          </label>
          <div className="flex flex-row w-full justify-around">
            <div className="flex items-center ">
              <input
                type="radio"
                id="cnpj"
                name="documentType"
                value="cnpj"
                checked={selectedOption === "cnpj"}
                onChange={handleOptionChange}
                className="mr-2 checked:bg-gray-900 checked:border-[#B853FF]"
              />
              <label htmlFor="cnpj">CNPJ</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cpf"
                name="documentType"
                value="cpf"
                checked={selectedOption === "cpf"}
                onChange={handleOptionChange}
                className="mr-2 checked:bg-gray-900 checked:border-[#B853FF]"
              />
              <label htmlFor="cpf">CPF</label>
            </div>
          </div>
        </div>

        {selectedOption === "cnpj" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="inputCnpj">
                Qual o CNPJ da sua empresa?
              </label>
              <InputMask
                mask="99.999.999/9999-99"
                maskChar={null}
                id="inputCnpj"
                name="inputCnpj"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#B853FF] "
              />
            </div>
        )}
        {selectedOption === "cpf" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="inputCpf">
              Qual o seu CPF?
            </label>
            <input
              type="text"
              id="inputCpf"
              name="inputCpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#B853FF]"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Qual o e-mail de contato da sua empresa?
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  focus:shadow-outline ${
              isEmailValid ? "focus:border-[#B853FF]" : "border-red-500"
            }`}
          />
        </div>
        {selectedOption === "cnpj" && (
          <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="empresa">
          Qual o nome fantasia ou razão social da sua empresa?
          </label>
          <input
            type="text"
            id="empresa"
              name="empresa"
              value={nameFantasia}
            onChange={(e) => setNameFantasia(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#B853FF]"
          />
        </div>
          
        )}

        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Qual o telefone/whatsapp (com DDD) da sua empresa?
          </label>
          <InputMask
            mask={shouldApplyMask ? maskPhone : ""}
            id="phone"
            name="phone"
            maskChar={null}
            onChange={(e) => {
              if (e.target.value.replace(/\D/g, "").length === 0) {
                setMaskPhone("");
                setShouldApplyMask(false);
              } else if (e.target.value.replace(/\D/g, "").length <= 10) {
                setMaskPhone("(99) 9999-9999");
              } else {
                setMaskPhone("(99) 9 9999-9999");
              }
              setPhone(e.target.value)
            }}
            value={phone}
            onBlur={() => setShouldApplyMask(true)}
            onFocus={() => setShouldApplyMask(false)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#B853FF]"
          />
        </div>
        <div className={`mb-4`}>
          <label className="block text-sm font-medium mb-1">
            Selecione qual grupo/ramo sua empresa faz parte.
          </label>
          <select
            value={nameGroup}
            onChange={(e) => {
              setNameGroup(e.target.value);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#B853FF]">
            <option value="Autônomos">Autônomo</option>
            <option value="Loteadoras">Loteadoras</option>
            <option value="Construtoras">Construtoras</option>
            <option value="Incorporadas">Incorporadoras</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <button
          type="submit"
          
          className="w-full text-white py-2 px-4 my-3 font-semibold  rounded-md  bg-[#B853FF] hover:bg-[#A013FF]  transition duration-300 ease-in-out">
          Cadastrar
        </button>
        {alertType && (
            <AlertComponent
              type={alertType}
              message={alertType === 'success' ? 'Pré cadastro realizado com sucesso!' : 'Ocorreu um problema no cadastro.'}
              onClose={handleCloseAlert}
            />
          )}
      </form>
    </div>
  );
};

export default CompanyForm;
