import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DecksDisplay from "../components/DecksDisplay";
import NewDeck from "../components/NewDeck";
import CreateDeck from "../components/CreateDeck";
import Study from "../components/Study";
import DeckInfo from "../components/DeckInfo";
import DeckEdit from "../components/DeckEdit";
import CardEdit from "../components/CardEdit";
import NewCard from "../components/NewCard";
import {Route, Switch} from "react-router-dom";


// where i get my decks in state and pass downward to components.
function Layout() {


  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <NewDeck/>
            <DecksDisplay/>

          </Route>
          <Route path={`/decks/new`}>
            <CreateDeck/>
          </Route>
          <Route path={`/decks/:deckId/study`}>
            <Study/>
          </Route>
          <Route path={`/decks/:deckId/edit`}>
            <DeckEdit/>
          </Route>
          <Route exact path={`/decks/:deckId`}>
            <DeckInfo/>
          </Route>
          <Route path={`/decks/:deckId/cards/new`}>
            <NewCard/>
          </Route>
          <Route path={`/decks/:deckId/cards/:cardId/edit`}>
            <CardEdit/>
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
