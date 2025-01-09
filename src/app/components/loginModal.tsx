"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal, Spinner, Alert } from "@nextui-org/react";
import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { handleLogin } from "@/libs/utils/authFunctions";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<{ type: "error" | "success"; text: string } | null>(null); // Single message state
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Update the message state with the latest message
  const addMessage = (type: "error" | "success", text: string) => {
    setMessages({ type, text }); // Overwrite the previous message
  };

  const onLogin = async (): Promise<void> => {
    if (!username || !password) {
      addMessage("error", "Username and private key are required.");
      return; 
    }

    setLoading(true); // Start loading
    try {
      const result = await handleLogin(username, password, dispatch);

      if (result.success) {
        addMessage("success", result.message);
        onClose(); // Close modal on success
      } else {
        addMessage("error", result.message);
      }
    } catch (err) {
      addMessage("error", "An error occurred. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <Button onPress={onOpen} color="primary" size="sm">
      
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={() => onClose()} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  variant="bordered"
                />
                <Input
                  label="Private Key (WIF)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your private key"
                  type="password"
                  variant="bordered"
                />
                {/* Message Alert */}
                {messages && (
                  <div className="flex flex-col gap-1 w-full mt-2">
                    <Alert hideIcon = {false}
                      color={messages.type === "success" ? "success" : "danger"}
                      // title={messages.type === "success" ? "Success" : "Error"}
                      variant="faded"
                    >
                      {messages.text}
                    </Alert>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onLogin} disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner  color = "white" size="sm" /> Please wait
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
