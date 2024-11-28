"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Book, Video, FileText } from "lucide-react";
import FaqTabContent from "@/components/app/FaqTabContent";

export default function PpvDocumentation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation PPV</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="docs">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="docs">Documents</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="docs">
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                <Button variant="ghost" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Guide complet de la PPV
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Video className="mr-2 h-4 w-4" />
                  Tutoriel : Mise en place de la PPV
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modèle de fiche individuelle PPV
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Texte de loi sur la PPV
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  FAQ sur la PPV
                </Button>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="faq">
            <FaqTabContent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
