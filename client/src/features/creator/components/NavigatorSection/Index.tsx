import Navigator from '@core/components/Navigator/Index';

const NavigatorSection = () => {
  return (
    <div className="flex flex-row justify-between gap-6">
      <Navigator
        href="/creator/courses"
        bgSize="290% 175%"
        bgPosition="3% 20%"
        bgImage="/images/klowhub_banner2.png">
        Mis cursos
      </Navigator>
      <Navigator
        href="/creator/projects"
        bgSize="300% 240%"
        bgPosition="-50% 3%"
        bgImage="/images/klowhub_banner2.png">
        Explorar proyectos
      </Navigator>
      <Navigator
        href="/creator/apps"
        bgSize="125% 100%"
        bgPosition="55% 100%"
        bgImage="/images/klowhub_banner2.png">
        Mis aplicaciones
      </Navigator>
      <Navigator
        href="/creator/consultancies"
        bgSize="300% 240%"
        bgPosition="-50% 3%"
        bgImage="/images/klowhub_banner2.png">
        Consultas tecnicas
      </Navigator>
    </div>
  );
};

export default NavigatorSection;
