const Home = () => {
  const handleSubmit = () => {
    try {
      console.log("button clicked!");
    } catch (error) {
      console.log("chatgpt is noob");
    }
  };

  return (
    <>
      <h1>Welcome to the homepage</h1>
      <a href="/upload">upload profile picture</a>
      <br /><br />
      <a href="/owner">owner's tab</a>
    </>
  );
};

export default Home;
