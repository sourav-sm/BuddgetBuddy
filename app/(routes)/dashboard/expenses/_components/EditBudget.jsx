"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budget } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog";
import { eq } from "drizzle-orm";


function EditBudget({budgetInfo}) {
    const [emojiIcon, setEmojiIcon] = useState([budgetInfo.icon]);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [budgetName, setBudgetName] = useState(budgetInfo.name); 
    const [budgetAmount, setBudgetAmount] = useState(budgetInfo.amount); 
    const {user}=useUser();

    const onUpdateBudget=async()=>{
      const result=await db.update(Budget).set({
        name:budgetName,
        amount:budgetAmount,
        icon:emojiIcon
      }).where(eq(Budget.id,budgetInfo.id))
      .returning();
      
      if(result){
        toast('Budget is Updated Successfully!')
      }

    }

  return (
    <div>
        
        <Dialog>
        <DialogTrigger asChild>
           <Button className="flex gap-2"> 
               <PenBox/> Edit
           </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
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
                    defaultValue={budgetInfo.name}
                    onChange={(e)=>setBudgetName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input 
                    placeholder="e.g., 5000$"
                    defaultValue={budgetInfo.amount} 
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
                   onClick={()=>onUpdateBudget()}//call create budget function
                >
                    Update Buddget
                </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget;