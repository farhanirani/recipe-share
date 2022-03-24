import styled from "styled-components";

export const FeatureContainer = styled.div`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
    url(https://images.unsplash.com/photo-1516684465974-78661ba8165d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjV8fG5vb2RsZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60);
  height: 100vh;
  max-height: 500px;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  padding: 0 1rem;

  h1 {
    font-size: clamp(3rem, 5vw, 5rem);
  }

  p {
    margin-bottom: 1rem;
    font-size: clamp(1rem, 3vw, 2rem);
  }
`;
export const FeatureButton = styled.button`
  font-size: 1.4rem;
  padding: 0.6rem 3rem;
  border: none;
  background: #00b894;
  color: #fff;
  transition: 0.2s ease-out;

  &:hover {
    /* color: #fff; */
    background: #00cec9;
    transition: 0.2s ease-out;
    cursor: pointer;
  }
`;
