import "./App.css";
import { nanoid } from "nanoid";
import { Form } from "./components/Form/Form";
import { Watch } from "./components/Watch/Watch";

import { useState } from "react";

function App() {
  const watchesDefValue = [
    {
      id: nanoid(),
      title: "Moskow",
      timezone: 3,
    },
    {
      id: nanoid(),
      title: "New York",
      timezone: -4,
    },
    {
      id: nanoid(),
      title: "London",
      timezone: 1,
    },
    {
      id: nanoid(),
      title: "Tokyo",
      timezone: 9,
    },
  ];

  const [watches, setWatches] = useState(watchesDefValue);

  const addWatch = (watch) => {
    watch.id = nanoid();
    setWatches((prevWatches) => [ ...prevWatches, watch ]);
  };

  const handleRemove = (watch) => {
    setWatches((prevWatches) =>
      prevWatches.filter((prevWatch) => prevWatch.id !== watch.id))
  };

  
  return (
    <div className="watches">
      <div className="mask"></div>
      <Form addWatch={addWatch} />

      <div className="watches__items">
        {watches.map(watch => 
          <Watch 
            key={watch.id} 
            watch={watch}
            handleRemove={handleRemove}
            />
        )}
      </div>
    </div>
  );
}

export default App;
