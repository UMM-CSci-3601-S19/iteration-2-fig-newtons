package umm3601.chat;

import io.getstream.core.http.Token;
import org.bson.Document;
import spark.Request;
import spark.Response;

import io.getstream.client.Client;

import java.net.MalformedURLException;

public class ChatRequestHandler {

  private final ChatController chatController;

  public ChatRequestHandler(ChatController chatController) {
    this.chatController = chatController;
  }

  /**
   * Method called from Server when the 'api/chats/:id' endpoint is received.
   * Get a JSON response with the chat found by provided id.
   */
  public String getChatJSON(Request req, Response res) {
    res.type("application/json");
    String id = req.params("id");
    String chat;
    try {
      chat = chatController.getChat(id);
    } catch (IllegalArgumentException iae) {
      res.status(400);
      res.body("The requested chat id " + id + " wasn't a legal Mongo Object ID.");
      return "";
    }
    if (chat != null) {
      return chat;
    } else {
      res.status(404);
      res.body("The request chat with id " + id + " was not found");
      return "";
    }
  }

  public Token authenticateChatUser(Request req, Response res) {
    res.type("application/json");

    Document user = Document.parse(req.body());

    try {
      Client client = Client.builder("h354aemvhp72", "jux8wqyt428348pjuxxzykmac4fwhw278btuxfbvx6xyd39y3mk2atk89dqw3s55").build();
      Token userToken = client.frontendToken(user.getString("_id"));
      return userToken;
    } catch (MalformedURLException mue) {
      System.err.println("Bad GetStream URL request was made");
    }
    return null;
  }
}
