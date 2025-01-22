"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budget } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog";


function CreateBudget() {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetName, setBudgetName] = useState(""); 
  const [budgetAmount, setBudgetAmount] = useState(""); 
  const {user}=useUser();

  const CreateBudget=async()=>{
     const result=await db.insert(Budget)
     .values({
         name:budgetName,
         amount:budgetAmount,
         createdBy:user?.primaryEmailAddress?.emailAddress,
         icon:emojiIcon 
     }).returning({insertId:Budget.id})

     if(result){
        toast("New Budget Created Successfully!")
     }
  }



  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-slate-100 p-10 rounded-md flex flex-col items-center border-2 border-dashed cursor-pointer hover:shadow-md mt-5">
            <h2>+</h2>
            <h2>Create a new Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Budget</DialogTitle>
            <DialogDescription>
              <div>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  aria-label="Choose Emoji"
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute z-10 mt-2">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className="mt-2">
                  <h2 className="text-black font-medium">Budget Name</h2>
                  <Input 
                    placeholder="e.g., Home Decor" 
                    onChange={(e)=>setBudgetName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input 
                    placeholder="e.g., 5000$" 
                    type="number"
                    onChange={(e)=>setBudgetAmount(e.target.value)} 
                    />
                </div>
                
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
            <Button className="mt-5 w-full"
                   disabled={!(budgetName&&budgetAmount)}//disable button if budgetName and budgetAmount is empty
                   onClick={()=>CreateBudget()}//call create budget function
                >
                    Create Buddget
                </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;

