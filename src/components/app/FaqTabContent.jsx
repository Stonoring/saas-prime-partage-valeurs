// FaqTabContent.jsx

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const FaqTabContent = () => {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Qu'est-ce que la PPV ?</h4>
          <p className="text-sm text-gray-600">
            La Prime de Partage de la Valeur (PPV) est un dispositif permettant aux employeurs de partager les bénéfices ou les performances de l'entreprise avec leurs salariés, sous forme de prime défiscalisée.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Quelle est l'obligation en 2025 concernant la PPV ?</h4>
          <p className="text-sm text-gray-600">
            À partir du 1er janvier 2025, les entreprises employant entre 11 et 49 salariés, avec un bénéfice net fiscal d'au moins 1 % du chiffre d'affaires pendant trois exercices consécutifs, devront mettre en place un dispositif de partage de la valeur.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Quels dispositifs peuvent remplacer la PPV obligatoire ?</h4>
          <p className="text-sm text-gray-600">
            Les entreprises peuvent choisir la participation, l'intéressement, un abondement sur un plan d'épargne salariale, ou encore le versement d'une PPV pour se conformer à l'obligation.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Quel est le montant maximum de la PPV ?</h4>
          <p className="text-sm text-gray-600">
            Le montant maximum est de 3 000 € par bénéficiaire et par année civile, pouvant être porté à 6 000 € en cas d'accord d'intéressement ou de versement par un organisme d'intérêt général.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Comment est calculé le seuil de 1 % du chiffre d'affaires ?</h4>
          <p className="text-sm text-gray-600">
            Le seuil est calculé sur le bénéfice net fiscal rapporté au chiffre d'affaires de l'entreprise, sur trois exercices consécutifs.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Quels salariés peuvent bénéficier de la PPV ?</h4>
          <p className="text-sm text-gray-600">
            Tous les salariés ayant un contrat de travail avec l'entreprise, y compris les apprentis, alternants et intérimaires, sont éligibles à la PPV.
          </p>
        </div>
        <div>
          <h4 className="font-medium">La PPV peut-elle être modulée entre les salariés ?</h4>
          <p className="text-sm text-gray-600">
            Oui, le montant peut varier en fonction de critères tels que la rémunération, l'ancienneté, ou la durée de travail.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Comment mettre en place la PPV dans une entreprise ?</h4>
          <p className="text-sm text-gray-600">
            La PPV peut être mise en place via un accord collectif ou une décision unilatérale de l'employeur, après consultation des représentants du personnel.
          </p>
        </div>
        <div>
          <h4 className="font-medium">La PPV est-elle imposable en 2025 ?</h4>
          <p className="text-sm text-gray-600">
            La PPV peut être exonérée d'impôt sur le revenu pour les salariés sous certaines conditions, notamment en fonction de leur rémunération et de la taille de l'entreprise.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Quels sont les avantages pour les entreprises ?</h4>
          <p className="text-sm text-gray-600">
            En plus de renforcer la fidélisation des salariés, la PPV permet aux entreprises de bénéficier d'exonérations fiscales et sociales, sous réserve de respecter les conditions légales.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};

export default FaqTabContent;
