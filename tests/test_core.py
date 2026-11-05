"""tests - 与 src/park_energy 结构对应的测试"""

from park_energy import __version__


def test_version():
    assert __version__ == "0.1.0"
