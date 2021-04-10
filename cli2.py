import argparse
import pathlib


class CLI:
    def __init__(self, **kwargs):
        self.root_parser = argparse.ArgumentParser(**kwargs)

        self.subparsers = self.root_parser.add_subparsers(title="Available commands", metavar="")
        self.migrate_parser = self.subparsers.add_parser("migrate", help="foo.")

        self.migrate_parser.add_argument(
            "-i", "--posts_dir", default="./_posts", type=pathlib.Path
        )
        self.migrate_parser.add_argument(
            "-o", "--articles_dir", default="./articles", type=pathlib.Path
        )
        self.migrate_parser.add_argument(
            "-n", "--no_blogit_init", action="store_true", default=False
        )

        self.transform_parser = self.subparsers.add_parser("tranform", help="bar.")


if __name__ == "__main__":

    cli = CLI(usage="migrator.py [command] [options]")

    cli.root_parser.parse_args()
    # cli.migrate_parser.parse_args()
