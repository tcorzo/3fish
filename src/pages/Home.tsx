import { appWindow, WebviewWindow } from "@tauri-apps/api/window";
import React, { useContext, useEffect, useState } from "react";
import { BorderDetails } from "../components/BorderDetails";
import { FishTankContainer } from "../components/FishTankContainer";
import { TitleBar } from "../components/TitleBar";
import { ProtectedImage, TitleBarButton } from "../components/TitlebarButton";
import { VolumeIndicator } from "../components/VolumeIndicator";
import { AudioContextReact } from "../context/audio_context";
import { useKeypresses } from "../hooks/useKeypresses";
import { useVolumeWheel } from "../hooks/useVolumeWheel";
import { classNames } from "../utils/classnames";
import { isDebug } from "../utils/debug";

export const openSettings = () =>
  new WebviewWindow("settings", {
    url: "/settings",
    focus: true,
    title: "Settings...",
    decorations: false,
    resizable: false,
  });

export const Home = (): React.ReactElement => {
  const {
    state: { isMuted },
    actions,
  } = useContext(AudioContextReact);

  useVolumeWheel();

  useKeypresses({
    actionKeymap: {
      Escape: () => appWindow.close(),
      KeyR: () => window.location.reload(),
    },
  });

  return (
    <>
      <VolumeIndicator />
      <div className="bg-grey relative top-0 left-0 flex border-2 border-black h-[390px] w-[520px]">
        <BorderDetails />
        <div className="flex-fit flex flex-col space-y-[2px] m-[4px] bg-black border-2 border-black border-solid">
          <div className="h-[36px] flex flex-row border-black border-b-2 space-x-[2px]">
            <Menu
              menuItems={[
                {
                  text: isMuted ? "Un<u>m</u>ute" : "<u>M</u>ute",
                  onClick: actions.toggleMute,
                  keyMap: "KeyM",
                },
                ...(isDebug
                  ? [
                      {
                        text: "<u>S</u>ettings",
                        onClick: openSettings,
                        keyMap: "KeyS",
                      },
                    ]
                  : []),
                {
                  text: "<u>C</u>lose",
                  separated: true,
                  onClick: appWindow.close,
                  keyMap: "KeyC",
                },
              ]}
            />
            <TitleBar title="So long..." />
            <TitleBarButton
              hasShine
              imageFilename="min"
              onClick={() => appWindow.minimize()}
            />
          </div>
          <div className="flex-fit">
            <FishTankContainer />
          </div>
        </div>
      </div>
    </>
  );
};

interface MenuItem {
  text: string;
  separated?: boolean;
  onClick: () => unknown;
  keyMap?: string;
}

const Menu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const [menuVisible, setMenuVisible] = useState(true);

  return (
    <div className="relative">
      <div className="group">
        <button
          className={"flex-container old-button group-active:bg-darker-grey"}
          onClick={() => setMenuVisible(true)}
        >
          <ProtectedImage
            className="group-active:invert"
            alt="menu"
            src="/images/menu.png"
          />
        </button>
      </div>
      {menuVisible ? (
        <>
          <MenuItems
            hideMenu={() => setMenuVisible(false)}
            menuItems={menuItems}
          />
          <div
            onClick={() => setMenuVisible(false)}
            className="h-screen w-screen absolute left-[-8px] top-[-8px] bg-[transparent] z-30"
          />
        </>
      ) : null}
    </div>
  );
};

const MenuItems = ({
  menuItems,
  hideMenu,
}: {
  hideMenu: () => unknown;
  menuItems: MenuItem[];
}) => {
  const [actionKeymap, setActionKeymap] = useState<
    Record<string, () => unknown>
  >({});

  useKeypresses({
    actionKeymap,
  });

  const onItemPress = (index: number) => {
    hideMenu();
    menuItems[index].onClick();
  };

  useEffect(() => {
    const newActionKeymap: typeof actionKeymap = {};

    for (const item in menuItems) {
      if (Object.prototype.hasOwnProperty.call(menuItems, item)) {
        const element = menuItems[item];
        if (element.keyMap) {
          newActionKeymap[element.keyMap] = () => {
            hideMenu();
            element.onClick();
          };
        }
      }
    }

    setActionKeymap(newActionKeymap);
  }, [menuItems]);

  return (
    <div className="bg-white flex flex-col absolute z-50 translate-y-0 translate-x-0 border-2 border-black min-w-[260px]">
      {menuItems.map((item, i) => (
        <button key={i} className="group" onClick={() => onItemPress(i)}>
          <div
            className={classNames(
              "px-[20px] flex-fit flex group-hover:bg-blue",
              item.separated ? "border-t-2 border-black" : ""
            )}
          >
            <span
              dangerouslySetInnerHTML={{ __html: item.text }}
              className="font-system text-[200%] tracking-wide leading-9 text-left group-hover:text-white"
            />
          </div>
        </button>
      ))}
    </div>
  );
};
