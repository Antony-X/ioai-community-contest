import { BookOpen, Shield, Users, Info } from 'lucide-react';

const RulesSection = () => {
  const ruleCategories = [
    {
      id: 'rules',
      icon: BookOpen,
      title: 'Contest rules',
      items: [
        'Use of LLMs for writing code or getting task ideas is strictly forbidden',
        'Use of the internet is forbidden except for reading official library documentation',
        'Communicating with anyone during the contest is forbidden',
        'Only ask questions regarding task statements using official methods'
      ]
    },
    {
      id: 'fairness',
      icon: Shield,
      title: 'Fair play policy',
      items: [
        'We cannot enforce these rules, but fair play ensures accurate IOAI simulation',
        'Following rules is in the best interest of all contestants',
        'Violations may result in disqualification from rankings',
        'Report suspected violations to organizers confidentially'
      ]
    },
    {
      id: 'conduct',
      icon: Users,
      title: 'Code of conduct',
      items: [
        'Respect fellow participants and organizers at all times',
        'No sharing of solutions during active contests',
        'Provide constructive feedback when reviewing others\' work',
        'Help newcomers learn and grow within the community'
      ]
    }
  ];

  return (
    <section id="rules" className="border-t border-black/[0.06] bg-neutral-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.01em] text-neutral-900 md:text-4xl">
            Contest rules
          </h2>
          <p className="mt-4 text-lg leading-[30px] text-neutral-600">
            Following these rules keeps the competition fair and close to the real IOAI.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ruleCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-black/[0.08] bg-white p-6"
            >
              <div className="flex items-center gap-2.5">
                <category.icon className="h-[18px] w-[18px] text-neutral-500" strokeWidth={1.5} />
                <h3 className="text-base font-medium text-neutral-900">{category.title}</h3>
              </div>

              <ul className="mt-5 space-y-3">
                {category.items.map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-5 text-neutral-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3 rounded-2xl border border-black/[0.08] bg-white px-6 py-4">
          <Info className="mt-0.5 h-[18px] w-[18px] shrink-0 text-neutral-500" strokeWidth={1.5} />
          <p className="text-sm leading-6 text-neutral-600">
            <span className="font-medium text-neutral-900">Note</span>{' '}
            We cannot enforce these rules technically, but following them ensures fair play and a more accurate simulation of the IOAI.
            It is in the best interest of all contestants to follow the rules honestly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
